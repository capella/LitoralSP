<?php
error_reporting(E_ALL);
ini_set( 'default_charset', 'UTF-8' );
header('Content-Type: text/html; charset=UTF-8');

require_once __DIR__.'/vendor/autoload.php'; 

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sunra\PhpSimple\HtmlDomParser;

$app = new Silex\Application(); 
$app['debug'] = true;

// CONFIGURA MYSQL
$config = parse_ini_file(__DIR__.'/config.ini', true);
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => $config['mysql']
));

$app->get('/praias.json', function ()  use ($app) {
	$sql = "SELECT id, name FROM municipios";
	$post['municipios'] = $app['db']->fetchAll($sql);

	$sql = "SELECT * FROM praias_status";
	$post['praias'] = $app['db']->fetchAll($sql);

	return $app->json($post, 201);
});

// Consulta a CETESB
$app->get('/', function ()  use ($app) {

	$output = "";

	$html = HtmlDomParser::file_get_html('http://www.cetesb.sp.gov.br/qualidade-da-praia');

	foreach($html->find('table') as $table) {
		foreach($table->find('tr') as $tr) {
			if($tr->find('td',0)->plaintext!='Praia'){
				// Infelizmente as informacoes estao muito sujas
				$praia = limpa($tr->find('td',0)->plaintext);
				$local = limpa($tr->find('td',1)->plaintext);

				// STATUS DA PRAIA
				$status = $tr->find('td',2)->plaintext; 
				if(strpos($status ,"Impr&oacute;pria") !== false)
					$status = 1;
				else
					$status = 0;

				// Parece idiota, mas formatando e desformatando, acaba-se com
				// os erros de formatação
				$cidade = limpa(htmlentities($table->prev_sibling()->plaintext, ENT_QUOTES, "UTF-8"));

				$sql = "
					SET @praia=?; 
					SET @cidade=?; 
					SET @local=?; 
					SET @status=?; 
					CALL `InsertPraia`(@praia, @cidade, @local, @status, @retorno);";
    			$app['db']->executeUpdate($sql, array($praia, $cidade, $local, (int) $status));

				echo $status."\t - \t".$praia."\n";

			}
		}
	}
	
    return $output;
});

$app->after(function (Request $request, Response $response) {
    $response->headers->set('Access-Control-Allow-Origin', '*');
});

$app->run();

// FUNCOES
function limpa($txt){
	$txt = str_replace("&nbsp;", '', $txt);
	$txt = ucwords(strtolower($txt));
	$txt = html_entity_decode($txt, ENT_QUOTES, "UTF-8");
	$txt = str_replace(" De ", ' de ', $txt);
	$txt = str_replace(" Da ", ' da ', $txt);
	$txt = str_replace(" Do ", ' do ', $txt);
	$txt = str_replace(" E ", ' e ', $txt);
	$txt = str_replace(" Ao ", ' ao ', $txt);
	$txt = str_replace(" A ", ' a ', $txt);
	$txt = str_replace(" As ", ' as ', $txt);
	return $txt;
} 

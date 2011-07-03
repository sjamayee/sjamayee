<?php
// $Id: sjamayee_model_relation_resource.inc

//header(‘Access-Control-Allow-Origin: *’);
//'Content-Type': 'application/json'
//drupal_add_http_header('Access-Control-Allow-Origin', 'null');
//drupal_add_http_header('Content-Type', 'text/javascript');

function _sjamayee_model_relation_resource_definition() {
  return array(
	  'model_relation' => array(
	    'retrieve' => array(
	      'help' => 'Retrieves a model relation',
	      'callback' => '_sjamayee_model_relation_resource_relation',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_model_relation_resource'),
	      'access callback' => '_sjamayee_model_relation_resource_access',
	      'access arguments' => array('view'),
	      'access arguments append' => TRUE,
	      'args' => array(
	        array(
	          'name' => 'id',
	          'type' => 'int',
	          'description' => 'The id of the relation to get',
	          'source' => array('path' => '0'),
	          'optional' => FALSE,
	        ),
	      ),
	    ),
	    'index' => array(
	      'help' => 'Retrieves a listing of model relations',
	      'callback' => '_sjamayee_model_relation_resource_index',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_model_relation_resource'),
	      'access callback' => 'user_access',
	      'access arguments' => array('access content'),
	      'access arguments append' => FALSE,
	      'args' => array(array(
	          'name' => 'page',
	          'type' => 'int',
	          'description' => '',
	          'source' => array(
	            'params' => 'page',
	          ),
	          'optional' => TRUE,
	          'default value' => 0,
	        ),
	        array(
	          'name' => 'parameters',
	          'type' => 'array',
	          'description' => '',
	          'source' => 'param',
	          'optional' => TRUE,
	          'default value' => array(),
	        ),
	      ),
	    ),
	  ),
  );
}
/*
function _sjamayee_model_relation_resource_index($page, $parameters) {
**return 'loadJson({"model_relations":' . db_query("SELECT * FROM {sja_model_relations}")->fetchAll() . '})';
  return 'loadJson({"model_relations": [{"id": 1},{"id": 2}]});';**

  //return db_query("SELECT * FROM {sja_model_relations}")->fetchAll();

	//drupal_add_http_header('Content-Type', 'application/json');

	$result = 'loadJson({"model-relations":[';
  $model_relations = db_query("SELECT * FROM {sja_model_relations}")->fetchAll();
	$i = 0;
  foreach ($model_relations as $model_relation) {
		if ($i > 0) { $result .= ','; }
		$result .= '{"id":' . $model_relation->id **. ',';
		$result .= '"name":' . $model_relation->name . ',';
		$result .= '"version":' . $model_relation->version . ',';
		$result .= '"parent_entity_id":' . $model_relation->parent_entity_id . ',';
		$result .= '"child_entity_id":' . $model_relation->child_entity_id . ',';
		$previous_id = ($model_relation->previous_id)?$model_relation->previous_id:'null';
		$result .= '"previous_id":' . $previous_id . ',';
		$next_id = ($model_relation->next_id)?$model_relation->next_id:'null';
		$result .= '"next_id":' . $next_id . ',';
		$text_id = ($model_relation->text_id)?$model_relation->text_id:'null';
		$result .= '"text_id":' . $text_id . ',';
		$result .= '"cby_id":' . $model_relation->cby_id . ',';
		$result .= '"mby_id":' . $model_relation->mby_id** . '}';
		$i++;
  }
	$result .= ']});';
  return $result;
}
*/

function _sjamayee_model_relation_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_model_relations}")->fetchAll();
}

function _sjamayee_model_relation_resource_relation($id) {
  return db_query("SELECT * FROM {sja_model_relations} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_model_relation_resource_access($op,$args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_model_relation_resource_relation($args[0]);
      $access = user_access('model_relation resource view any relation');
      //$access = $access || $type->id == $user->uid && user_access('model_relation resource view own relations');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_model_relation_resource_schema() {
  $schema = array();
  $schema['sja_model_relations'] = array(
    'description' => 'Sjamayee model relations',
    'fields' => array(
      'id' => array(
        'type'        => 'serial',
        'description' => 'Primary ID',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
        'no export'   => TRUE,
      ),
      'name' => array(
        'description' => 'Name',
        'type'        => 'varchar',
        'length'      => 255,
        'not null'    => TRUE,
      ),
      'version' => array(
        'description' => 'Version',
        'type'        => 'int',
				'size'				=> 'small',
        'not null'    => TRUE,
      ),
      'parent_entity_id' => array(
        'description' => 'Parent entity ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
	    'child_entity_id' => array(
	      'description' => 'Child entity ID',
	      'type'        => 'int',
	      'unsigned'    => TRUE,
	      'not null'    => TRUE,
	    ),
		  'previous_id' => array(
		    'description' => 'Previous ID',
		    'type'        => 'int',
		    'unsigned'    => TRUE,
		    'not null'    => TRUE,
		  ),
			'next_id' => array(
			  'description' => 'Next ID',
			  'type'        => 'int',
			  'unsigned'    => TRUE,
			  'not null'    => TRUE,
			),
      'text_id' => array(
	      'description' => 'Text ID',
	      'type'        => 'int',
	      'unsigned'    => TRUE,
	      'not null'    => TRUE,
      ),
      'cby_id' => array(
        'description' => 'Created by ID',
        'type'        => 'int',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
      ),
      'mby_id' => array(
        'description' => 'Modified by ID',
        'type'        => 'int',
     		'unsigned'    => TRUE,
     		'not null'    => TRUE,
    	),
    ),
    'primary key' => array('id'),
  );	
  return $schema;
}

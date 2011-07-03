<?php
// $Id: sjamayee_model_entity_resource.inc

function _sjamayee_model_entity_resource_definition() {
  return array(
	  'model_entity' => array(
	    'retrieve' => array(
	      'help' => 'Retrieves a model entity',
	      'callback' => '_sjamayee_model_entity_resource_entity',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_model_entity_resource'),
	      'access callback' => '_sjamayee_model_entity_resource_access',
	      'access arguments' => array('view'),
	      'access arguments append' => TRUE,
	      'args' => array(
	        array(
	          'name' => 'id',
	          'type' => 'int',
	          'description' => 'The id of the entity to get',
	          'source' => array('path' => '0'),
	          'optional' => FALSE,
	        ),
	      ),
	    ),
	    'index' => array(
	      'help' => 'Retrieves a listing of model entities',
	      'callback' => '_sjamayee_model_entity_resource_index',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_model_entity_resource'),
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
function _sjamayee_model_entity_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_model_entities}")->fetchAll();
}

function _sjamayee_model_entity_resource_entity($id) {
  return db_query("SELECT * FROM {sja_model_entities} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_model_entity_resource_access($op,$args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_model_entity_resource_entity($args[0]);
      $access = user_access('model_entity resource view any entity');
      //$access = $access || $type->id == $user->uid && user_access('model_entity resource view own entities');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_model_entity_resource_schema() {
  $schema = array();
  $schema['sja_model_entities'] = array(
    'description' => 'Sjamayee model entities',
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
	    'description' => array(
	      'description' => 'Description',
	      'type'        => 'text',
				'size'				=> 'medium',
	      'not null'    => FALSE,
	    ),
      'type_id' => array(
        'description' => 'Type ID',
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

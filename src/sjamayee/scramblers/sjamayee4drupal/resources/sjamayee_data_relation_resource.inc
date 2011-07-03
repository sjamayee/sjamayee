<?php
// $Id: sjamayee_data_relation_resource.inc

function _sjamayee_data_relation_resource_definition() {
  return array(
	  'data_relation' => array(
	    'retrieve' => array(
	      'help' => 'Retrieves a data relation',
	      'callback' => '_sjamayee_data_relation_resource_relation',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_data_relation_resource'),
	      'access callback' => '_sjamayee_data_relation_resource_access',
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
	      'help' => 'Retrieves a listing of data relations',
	      'callback' => '_sjamayee_data_relation_resource_index',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_data_relation_resource'),
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

function _sjamayee_data_relation_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_data_relations}")->fetchAll();
}

function _sjamayee_data_relation_resource_relation($id) {
  return db_query("SELECT * FROM {sja_data_relations} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_data_relation_resource_access($op,$args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_data_relation_resource_relation($args[0]);
      $access = user_access('data_relation resource view any relation');
      //$access = $access || $type->id == $user->uid && user_access('data_relation resource view own relations');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_data_relation_resource_schema() {
  $schema = array();
  $schema['sja_data_relations'] = array(
    'description' => 'Sjamayee data relations',
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
	    'model_relation_id' => array(
	      'description' => 'Model relation ID',
	      'type'        => 'int',
	      'unsigned'    => TRUE,
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

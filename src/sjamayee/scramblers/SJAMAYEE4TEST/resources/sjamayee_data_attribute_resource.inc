<?php
// $Id: sjamayee_data_attribute_resource.inc

function _sjamayee_data_attribute_resource_definition() {
  return array(
	  'data_attribute' => array(
	    'retrieve' => array(
	      'help' => 'Retrieves a data attribute',
	      'callback' => '_sjamayee_data_attribute_resource_attribute',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_data_attribute_resource'),
	      'access callback' => '_sjamayee_data_attribute_resource_access',
	      'access arguments' => array('view'),
	      'access arguments append' => TRUE,
	      'args' => array(
	        array(
	          'name' => 'id',
	          'type' => 'int',
	          'description' => 'The id of the attribute to get',
	          'source' => array('path' => '0'),
	          'optional' => FALSE,
	        ),
	      ),
	    ),
	    'index' => array(
	      'help' => 'Retrieves a listing of data attributes',
	      'callback' => '_sjamayee_data_attribute_resource_index',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_data_attribute_resource'),
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

function _sjamayee_data_attribute_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_data_attributes}")->fetchAll();
}

function _sjamayee_data_attribute_resource_attribute($id) {
  return db_query("SELECT * FROM {sja_data_attributes} WHERE id = :id", array(':id' => $id))->fetchObject();
}

function _sjamayee_data_attribute_resource_access($op,$args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_data_attribute_resource_attribute($args[0]);
      $access = user_access('data_attribute_resource view any attribute');
      //$access = $access || $type->id == $user->uid && user_access('data_attribute_resource view own attributes');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

function sjamayee_data_attribute_resource_schema() {
  $schema = array();
  $schema['sja_data_attributes'] = array(
    'description' => 'Sjamayee data attributes',
    'fields' => array(
      'id' => array(
        'type'        => 'serial',
        'description' => 'Primary ID',
        'unsigned'    => TRUE,
        'not null'    => TRUE,
        'no export'   => TRUE,
      ),
	    'entity_id' => array(
	      'description' => 'Entity ID',
	      'type'        => 'int',
	      'unsigned'    => TRUE,
	      'not null'    => TRUE,
	    ),
      'version' => array(
        'description' => 'Version',
        'type'        => 'int',
				'size'				=> 'small',
        'not null'    => TRUE,
      ),
	    'name' => array(
	      'description' => 'Name',
	      'type'        => 'varchar',
	      'length'      => 255,
	      'not null'    => TRUE,
	    ),
	    'value' => array(
	      'description' => 'Value',
	      'type'        => 'varchar',
	      'length'      => 255,
				'default'			=> '',
	      'not null'    => TRUE,
	    ),
	    'model_attribute_id' => array(
	      'description' => 'Model attribute ID',
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

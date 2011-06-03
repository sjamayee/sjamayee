<?php
// $Id: sjamayee_data_child_relation_resource.inc

function _sjamayee_data_child_relation_resource_definition() {
  return array(
	  'data_child_relation' => array(
	    'retrieve' => array(
	      'help' => 'Retrieves a data child relation',
	      'callback' => '_sjamayee_data_child_relation_resource_relation',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_data_child_relation_resource'),
	      'access callback' => '_sjamayee_data_child_relation_resource_access',
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
	      'help' => 'Retrieves a listing of data child relations',
	      'callback' => '_sjamayee_data_child_relation_resource_index',
	      'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_data_child_relation_resource'),
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

function _sjamayee_data_child_relation_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_data_relations}")->fetchAll();
}

function _sjamayee_data_child_relation_resource_relation($id) {
  return db_query("SELECT * FROM {sja_data_relations} WHERE parent_entity_id = :id", array(':id' => $id))->fetchAll();
}

function _sjamayee_data_child_relation_resource_access($op,$args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_data_child_relation_resource_relation($args[0]);
      $access = user_access('sjamayee_data_child_relation_resource view any relation');
      //$access = $access || $type->id == $user->uid && user_access('data_child_relation_resource view own relations');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}


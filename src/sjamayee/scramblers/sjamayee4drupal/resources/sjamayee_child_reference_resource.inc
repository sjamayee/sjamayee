<?php
// $Id$

/**
 * @file
 * ....
 */

function _sjamayee_child_relation_resource_definition() {
  return array(
    'reference' => array(
      'retrieve' => array(
        'help' => 'Retrieves a child reference',
        'callback' => '_sjamayee_child_reference_resource_reference',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_child_reference_resource'),
        'access callback' => '_sjamayee_child_reference_resource_access',
        'access arguments' => array('view'),
        'access arguments append' => TRUE,
        'args' => array(
          array(
            'name' => 'id',
            'type' => 'int',
            'description' => 'The id of the reference to get',
            'source' => array('path' => '0'),
            'optional' => FALSE,
          ),
        ),
      ),
      'index' => array(
        'help' => 'Retrieves a listing of child references',
        'callback' => '_sjamayee_child_reference_resource_index',
        'file' => array('file' => 'inc', 'module' => 'sjamayee', 'name' => 'resources/sjamayee_child_reference_resource'),
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

function _sjamayee_child_reference_resource_index($page, $parameters) {
  return db_query("SELECT * FROM {sja_references}")->fetchAll();
}

function _sjamayee_child_reference_resource_reference($id) {
  return db_query("SELECT * FROM {sja_references} WHERE pei = :id", array(':id' => $id))->fetchAll();
}

function _sjamayee_child_reference_resource_access($op, $args) {
  global $user;
  $access = FALSE;
  switch ($op) {
    case 'view':
      //$type = _sjamayee_child_reference_resource_reference($args[0]);
      $access = user_access('sjamayee_child_reference_resource view any reference');
      //$access = $access || $type->id == $user->uid && user_access('child_reference_resource view own references');
      break;
  }
  return TRUE; //FALSE; //$access;            // !!!!!!!!!!!!!!!!!!!!!!! NOK !!!!!!!!!!!!!!!!!!!!!!!
}

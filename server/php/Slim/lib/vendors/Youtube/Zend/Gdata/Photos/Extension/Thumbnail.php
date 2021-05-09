<?php

/**
 * Zend Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://framework.zend.com/license/new-bsd
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@zend.com so we can send you a copy immediately.
 *
 * @category   Zend
 * @package    Zend_Gdata
 * @subpackage Photos
 * @copyright  Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 * @version    $Id: Thumbnail.php 24593 2012-01-05 20:35:02Z matthew $
 */

/**
 * @see Zend_Gdata_Extension
 */
require_once APP_PATH."/server/php/Slim/lib/vendors".DS."Youtube".DS.'Zend/Gdata/Extension.php';

/**
 * @see Zend_Gdata_Photos
 */
require_once APP_PATH."/server/php/Slim/lib/vendors".DS."Youtube".DS.'Zend/Gdata/Photos.php';

/**
 * Represents the gphoto:thumbnail element used by the API.
 * This class represents the URI for a thumbnail image.
 *
 * @category   Zend
 * @package    Zend_Gdata
 * @subpackage Photos
 * @copyright  Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license    http://framework.zend.com/license/new-bsd     New BSD License
 */
class Zend_Gdata_Photos_Extension_Thumbnail extends Zend_Gdata_Extension
{

    protected $_rootNamespace = 'gphoto';
    protected $_rootElement = 'thumbnail';

    /**
     * Constructs a new Zend_Gdata_Photos_Extension_Thumbnail object.
     *
     * @param string $text (optional) The thumbnail URI to represent.
     */
    public function __construct($text = null)
    {
        $this->registerAllNamespaces(Zend_Gdata_Photos::$namespaces);
        parent::__construct();
        $this->setText($text);
    }

}

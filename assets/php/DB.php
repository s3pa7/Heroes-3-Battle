<?php
class DB
{
	/**
	 * @var PDO $connection
	 */
	protected static $connection;

	public static function getConnection()
	{
		if (!self::connection) {
			self::connection = new PDO(....)
		}

		return self::connection;
	}

	public static function query($sql, $params) {
		$sth =self::getConnection()->prepare($sql);
		$sth->execute($params);
	}
}

DB::query('SELECT * FROM people WHERE id= ?', [1]);
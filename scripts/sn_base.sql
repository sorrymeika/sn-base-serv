--# mysql -u root -p
--# Enter password: 12345Qwert

-- 创建用户
create user 'dev'@'localhost' identified by '12345Qwert';

-- 设置用户密码等级
ALTER USER 'dev'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345Qwert';
FLUSH PRIVILEGES;

-- 查看用户
SELECT User, Host FROM mysql.user;

-- 创建库存数据库
create database if not exists sn_base;
-- 分配权限
grant ALL on sn_base.* to 'dev'@'localhost';

-- 查看用户权限
show grants for 'dev'@'localhost';

-- 展示所有数据库
show databases;

-- 使用数据库
use sn_base;

create table province (
    id int(9) primary key,
    name varchar(20),
    areaCode varchar(10)
);

create table city (
    id int(9) primary key,
    name varchar(20),
    areaCode varchar(10),
    initial varchar(1),
    provinceCode varchar(10),
    provinceId int(11)
);

create table district (
    id int(9) primary key,
    name varchar(20),
    areaCode varchar(10),
    cityCode varchar(10),
    cityId int(9)
);
alter table district add INDEX areaCodeIndex (areaCode);
/*========================================================= molirun数据库*/

/*================================= 建立表空间及对应dba*/
 -- create user
 GRANT USAGE ON *.* TO 'molirun'@'localhost' IDENTIFIED BY 'molirun' WITH GRANT OPTION;
 -- create database
 CREATE DATABASE molirun CHARACTER SET  utf8  COLLATE utf8_general_ci;
 -- grant user 权限1,权限2,select,insert,update,delete,create,drop,index,alter,grant,references,reload,shutdown,process,file等14个权限
 GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,LOCK TABLES ON molirun.*  TO 'molirun'@'localhost' IDENTIFIED BY 'molirun';

/*================================= 建立表、表主外键、多表关联等T-SQL*/
-- 改变当前数据库
USE molirun;

/*
用户表
*/
create table user (
    id INT NOT NULL auto_increment COMMENT 'ID标识',
    grouptype INT NOT NULL COMMENT '组别(5:5公里, 10:10公里)',
    teesize VARCHAR(128)  NOT NULL COMMENT '尺码(XS, S, M, L, XL, XXL)',
    name VARCHAR(128) NOT NULL COMMENT '姓名',
    sex INT NOT NULL COMMENT '性别(0:男, 1:女)',
    age VARCHAR(128) NOT NULL COMMENT '出生年月',
    cardtype INT NOT NULL COMMENT '证件类型(0:身份证, 1:护照, 2:港澳通行证, 3:台胞证)',
    cardnumber VARCHAR(128) NOT NULL COMMENT '证件号码',
    phone CHAR(11) NOT NULL COMMENT '手机号码',
    ename VARCHAR(128) NOT NULL COMMENT '紧急联系人',
    ephone CHAR(11) NOT NULL COMMENT '紧急联系方式',
    packagetype INT NOT NULL COMMENT '赛事包类型(0:100元一般赛事包, 1:200元高级赛事包)',
    paystatus BIGINT NOT NULL COMMENT '支付状态(0:待支付, 1:已支付)',
    adate VARCHAR(19) NOT NULL COMMENT '提交信息时间',
    openid VARCHAR(256) NOT NULL COMMENT '微信用户标示',
    headimgurl VARCHAR(256) NOT NULL COMMENT '微信用户头像',
    nickname VARCHAR(256) NOT NULL COMMENT '微信用户昵称',
    outtradeno VARCHAR(256) COMMENT '商户订单号',
    result VARCHAR(128) COMMENT '比赛成绩分.秒',
    primary key (id) -- 主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
库存表
*/
create table stock (
    id INT NOT NULL auto_increment COMMENT 'ID标识',
    fivekms INT NOT NULL COMMENT '5公里报名数限额1000, 初始化后递减',
    tenkms INT NOT NULL COMMENT '10公里报名数限额2000, 初始化后递减',
    xssize INT NOT NULL COMMENT 'T恤尺码xs限额300, 初始化后递减',
    ssize INT NOT NULL COMMENT 'T恤尺码s限额700, 初始化后递减',
    msize INT NOT NULL COMMENT 'T恤尺码m限额900, 初始化后递减',
    lsize INT NOT NULL COMMENT 'T恤尺码l限额750, 初始化后递减',
    xlsize INT NOT NULL COMMENT 'T恤尺码xl限额400, 初始化后递减',
    xxlsize INT NOT NULL COMMENT 'T恤尺码xxl限额150, 初始化后递减',
    generalpackage INT NOT NULL COMMENT '一般赛事包限额1700, 初始化后递减',
    seniorpackage INT NOT NULL COMMENT '高级赛事包限额1500, 初始化后递减',
    primary key (id) -- 主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*
错误记录表
*/
create table syslog (
    id INT NOT NULL auto_increment COMMENT 'ID标识',
    type INT NOT NULL COMMENT '日志类型(0:错误, 1:日志)',
    message VARCHAR(256) NOT NULL COMMENT '日志信息',
    primary key (id) -- 主键
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*================================= 初始化数据T-SQL*/
-- stock
INSERT INTO stock(fivekms, tenkms, xssize, ssize, msize, lsize, xlsize, xxlsize, generalpackage, seniorpackage) VALUES(1000, 2000, 300, 700, 900, 750, 400, 150, 1700, 1500);


create table if not exists user (id integer primary key AUTO_INCREMENT, username text, password_hash text, admin integer);
select * from user where username="aaa" AND 1=1;--" AND password="bbb"
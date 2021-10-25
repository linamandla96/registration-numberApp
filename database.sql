create table regTowns(
	id serial not null primary key,
	towns text not null,
    regCity text not  null
);

create table regNumbers (
	id serial not null primary key,
    regnumbers text not null,
    reg int,
    foreign key(reg) references regTowns(id)		
);
INSERT INTO regTowns(towns,regCity) VALUES('Belville','CY'),
INSERT INTO regTowns(towns,regCity) VALUES('CapeTown','CA'),
INSERT INTO regTowns(towns,regCity) VALUES('Malmesbury','CK')
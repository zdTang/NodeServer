-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE flos;

--
-- Drop table `pia_leg`
--
DROP TABLE IF EXISTS pia_leg;

--
-- Set default database
--
USE flos;

--
-- Create table `pia_leg`
--
CREATE TABLE pia_leg (
  pia_route_id varchar(30) NOT NULL,
  step_id varchar(45) NOT NULL,
  location_name varchar(45) DEFAULT NULL,
  start_time datetime DEFAULT NULL,
  depart_time datetime DEFAULT NULL,
  loading_time decimal(2, 0) DEFAULT NULL,
  transit_time decimal(2, 0) DEFAULT NULL,
  deliver_location varchar(45) DEFAULT NULL,
  arrive_time datetime DEFAULT NULL,
  cost decimal(2, 0) DEFAULT NULL,
  PRIMARY KEY (pia_route_id, step_id)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create foreign key
--
ALTER TABLE pia_leg
ADD CONSTRAINT FK_pia_step_pia_route_id FOREIGN KEY (pia_route_id)
REFERENCES pia_route (routeID);
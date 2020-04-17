-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE flos;

--
-- Create table `pia_route`
--
CREATE TABLE pia_route (
  truckID varchar(30) DEFAULT NULL,
  GPSid varchar(30) DEFAULT NULL,
  routeID varchar(30) NOT NULL,
  PRIMARY KEY (routeID)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_general_ci;

--
-- Create index `routeID_UNIQUE` on table `pia_route`
--
ALTER TABLE pia_route
ADD UNIQUE INDEX routeID_UNIQUE (routeID);
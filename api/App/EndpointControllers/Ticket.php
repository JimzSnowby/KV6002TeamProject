<?php

namespace App\EndpointControllers;

class Ticket extends Endpoint {

    private function assignTicket() {
        $dbConn = new \App\Database(MAIN_DATABASE);
        $sql = "
                CREATE TRIGGER assign_tickets_on_insert
                AFTER INSERT ON participant
                FOR EACH ROW
                BEGIN
                    DECLARE participantID INT;
                    SET participantID = NEW.participantID;
                    INSERT INTO participant (user_id) VALUES (user_id);
                END;
                ";

        $dbConn->executeSQL($sql);
    }
    


 }
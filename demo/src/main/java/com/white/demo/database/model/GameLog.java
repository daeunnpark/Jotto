package com.white.demo.database.model;

import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;




@Entity // This tells Hibernate to make a table out of this class
public class GameLog {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private int logID;

    private String username;

    private int game_ID;

    private String date;

    private String word;

    private int letterCount;

    public String getUsername(){
        return this.username;
    }

    public String getDate(){
        return this.date;
    }

    public String getWord(){
        return this.word;
    }

    public int getGame_ID(){
        return this.game_ID;
    }

    public int getCount(){
        return this.letterCount;
    }

    public void setUsername(String usn){
        this.username = usn;
    }

    public void setGame_ID(int gid){
        this.game_ID = gid;
    }

    public void setDate(String date){
        this.date = date;
    }

    public void setWord(String word){
        this.word = word;
    }

    public void setLetterCount(int count){
        this.letterCount = count;
    }

}
package com.white.demo.database;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.white.demo.database.model.GameLog;
import com.white.demo.database.model.Game;
import com.white.demo.database.model.Login;
import com.white.demo.database.Repositories.GameLogRepository;
import com.white.demo.database.Repositories.GameRepository;
import com.white.demo.database.Repositories.LoginRepository;
import java.util.Date;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class DataController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private GameRepository gameRepository;
    private LoginRepository loginRepository;
    private GameLogRepository logRepository;


    @GetMapping(path="/addGame") // Map ONLY GET Requests
    public @ResponseBody String addNewGame (@RequestParam int game_ID
            , @RequestParam String Player1, @RequestParam String Player2) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request


        Game g = new Game();
        g.setGame_ID(game_ID);
        g.setPlayer1(Player1);
        g.setPlayer2(Player2);
        gameRepository.save(g);

        return "saved";

    }

    @GetMapping(path="/addLogin") // Map ONLY GET Requests
    public @ResponseBody String addNewLogin (@RequestParam String email
            , @RequestParam String username, @RequestParam String password) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request


        Login l = new Login();
        l.setUsername(username);
        l.setEmail(email);
        l.setPassword(password);
        loginRepository.save(l);
        return "save";

    }

    @GetMapping(path="/addGameLog") // Map ONLY GET Requests
    public @ResponseBody String addNewGameLog (@RequestParam String username, @RequestParam int game_ID, @RequestParam Date date,
             @RequestParam String word, @RequestParam int letterCount) {
        // @ResponseBody means the returned String is the response, not a view name
        // @RequestParam means it is a parameter from the GET or POST request


        GameLog l = new GameLog();
        l.setUsername(username);
        l.setGame_ID(game_ID);
        l.setDate(date);
        l.setWord(word);
        l.setLetterCount(letterCount);
        logRepository.save(l);
        return "save";

    }


    @GetMapping(path="/allLogin")
    public @ResponseBody Iterable<Login> getAllLogin() {
        // This returns a JSON or XML with the users
        return loginRepository.findAll();
    }

    @GetMapping(path="/allGameLog")
    public @ResponseBody Iterable<GameLog> getAllGameLog() {
        // This returns a JSON or XML with the users
        return logRepository.findAll();
    }

    @GetMapping(path="/allGame")
    public @ResponseBody Iterable<Game> getAllGame() {
        // This returns a JSON or XML with the users
        return gameRepository.findAll();
    }


}
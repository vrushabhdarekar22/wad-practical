const Song = require('../models/Song');


// in songs.map(s => dont,put curly braces here)
const renderTable = async (res, songs, message = "") => {
    let html = `
    <h3>${message}</h3>
    <table border="1" style="width:100% ;border-collapse:collapse" >
    <tr>
        <th>Film</th>
        <th>Singer</th>
        <th>Song</th>
        <th>Director</th>
        <th>Actor</th>
        <th>Actress</th>
    </tr>

    
    ${songs.map(s =>
        `
        <tr>
            <td>${s.Film}</td>
            <td>${s.Singer}</td>
            <td>${s.Songname}</td>
            <td>${s.Music_director}</td>
            <td>${s.Actor}</td>
            <td>${s.Actress}</td>
        </tr>
        `
    ).join("")}

    </table>
    </br>
    <hr>
    <a href="/">Go to Dashboard</a>
    `;


    res.send(html);
}

exports.initDB = async (req, res) => {
    try {
        await Song.deleteMany({});

        const initial = [
            { Songname: "Song1", Film: "Film1", Music_director: "Dir1", Singer: "Singer1" },
            { Songname: "Song2", Film: "Film2", Music_director: "Dir2", Singer: "Singer2" },
            { Songname: "Song3", Film: "Film3", Music_director: "Dir3", Singer: "Singer3" },
            { Songname: "Song4", Film: "Film4", Music_director: "Dir4", Singer: "Singer4" },
            { Songname: "Song5", Film: "Film5", Music_director: "Dir5", Singer: "Singer5" }
        ]

        await Song.insertMany(initial);

        res.send("Music Databse initialized successfully <a href='/'>Go to Dashboard<a/>")
    } catch (err) {
        console.log(err);
    }
}

exports.listAll = async (req,res) => {
    try{
        const songs = await Song.find();

        renderTable(res,songs,`Loaded ${songs.length} Songs`);
    }catch(e){
        console.log(e);
    }
}



exports.searchSong = async (req,res) => {
    try{
        let {director,singer ,film} = req.query;

        let query = {};

        if(director) query.Music_director = director;
        if(singer) query.Singer = singer;
        if(film) query.Film = film;

        const result = await Song.find(query);


        if(result.matchedCount === 0){
            res.send(res,songs,"No documents matched <a href='/'>Go to Dashboard<a/>")
        }

        renderTable(res,result,"Search Result:");

    }catch(e){
        console.log(e);
    }
}

exports.addSong = async (req,res) => {
    try{
        await Song.create(req.body);

        const songs = await Song.find();

        renderTable(res,songs,'Added song');

    }catch(e){
        console.log(e);
    }
}

exports.deleteSong = async (req,res) => {
    try{
        let songName = req.body.songName;
        const result = await Song.deleteOne({Songname:songName});

        if(result.deletedCount === 0){
            res.send(`No Songs matched ,SongName:${songName}`);
        }
        const songs = await Song.find();

        renderTable(res,songs,`deleted song:${songName}`);

    }catch(e){
        console.log(e);
    }
}

exports.updateCast = async (req,res) => {
    try{
        const result = await Song.updateOne(
            {Songname:req.body.songName},
            {
                $set:{
                    Actor:req.body.actor,
                    Actress:req.body.actress
                }
            }
        );

        const songs = await Song.find();
        // matchedCount is only given by updateOne and updateMany
        if(result.matchedCount === 0){
            renderTable(res,songs,"No result found");
        }




        renderTable(res,songs,`Updated songCast:${req.body.songName}`);

    }catch(e){
        console.log(e);
    }
}
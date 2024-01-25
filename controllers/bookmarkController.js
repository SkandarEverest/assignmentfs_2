const { Movie, User, Bookmark } = require('../models');

class BookmarkController {

    static GetBookmarkByID(req,res){
        let authenticatedUser = res.locals.user;
        
        User.findAll(
            {
                where:{
                    id: authenticatedUser.id
                },
                include: 'movies'
        
            }
        )
            .then(result => {
                res.status(200).json(result[0].movies);
            })
            .catch(err => {
                res.status(500).json(err);
            })
    }

    static async CreateBookmarkWithID(req,res){

        try {
            let movieid = +req.params.id;
            let userid = res.locals.user.id;

            
            let o = await Bookmark.findOne({where : {
                userid: userid,
                movieid: movieid
            }});
            
            if (o) {
                // Record Found
                throw ({ name: "already bookmarked" });
            }

            let result = await Bookmark.create({
                movieid,
                userid
            });    

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ code: 500, message: [error.name] })
        }
           
    }


    static DeleteBookmarkByID(req,res){
        let id = +req.params.id;
        let authenticatedUser = res.locals.user;

        Bookmark.destroy(
            {
                where:{
                    userid: authenticatedUser.id,
                    movieid: id
                }
            }
        )
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
           
    }

 
}

module.exports = BookmarkController;
async function createRoom(req, res) {

    try {
        const { name, description, is_private, owner_id } = req.body

        const owner = await User.findOne({ _id: req.userId })
        //const connected_users = await User.find({_id:{$in:connected_users}})
        //const connected_clients = await Cliente.find({_id:{$in:connected_clients}})

        console.log("owner", owner)
        const room1 = await Room.findOne({ name }).populate('owner').populate('users').populate({ path: 'messages', model: "Message", populate: { path: 'user_sender' } })
        if (room1) {

            //res.status(200).json({type:"error",message:"La sala ya existe"})

            return res.status(200).json(room1)


        }

        const room = new Room({ name, description, is_private, owner: owner._id })

        room.users.push(owner._id)
        await room.save()

        owner.rooms.push(room._id)
        await owner.save()

        res.status(200).json(await Room.findById(room._id).populate('owner').populate('users'))


    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(200).json({ type: "error", message: "Error al crear la sala" })
    }
}

async function updateRoom(req, res) {
    const { id } = req.params
    const { name, description, is_private, owner, connected_users, connected_clients } = req.body
    const room = await Room.findByIdAndUpdate(id, { name, description, is_private, owner, connected_users, connected_clients })
    res.status(200).json(room)
}

async function deleteRoom(req, res) {
    const { id } = req.params
    await Room.findByIdAndDelete(id)
    res.status(200).json({ message: "Room deleted" })
}

async function getRooms(req, res) {
    const rooms = await Room.find({ owner: req.user._id })
    res.status(200).json(rooms)
}

async function getRoomById(req, res) {
    const { id } = req.params


    console.log(req.params)

    if (id == "admin") {

        const room = await Room.findOne({ name: "admin" }).select("_id name owner users").populate('owner').populate('users')



        //console.log(req.user)
        if (!room) {

            const _room = new Room({
                name: "admin",
                type: "group",
                owner: req.userId,
                users: [req.userId]
            })

            await _room.save()

            console.log("se ha creado la room del admin!")

            return res.status(200).json(_room)
        }


        const unreadCount = await Message.countDocuments({
            room: room._id,
            readBy: { $ne: req.userId }
        });

        return res.status(200).json({
            ...room.toObject(),
            unreadCount
        })


    }




    const room = await Room.findById(id).populate('owner')
        .populate('connected_users')
        .populate('connected_clients')
        .populate('messages')

    if (!room) {
        return res.status(404).json({ message: "Room not found" })
    }
    if (room.owner.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "You are not the owner of this room" })
    }
    res.status(200).json(room)
} 

async function joinRoom(req, res) {
    const { id } = req.params
    const { user_id } = req.body
    console.log("user_id--->", user_id)
    console.log("id--->", id)
    const room = await Room.findById(id).populate('users')
    console.log("room--->", room)
    const user = await User.findOne({ sqlite_id: user_id })
    console.log("user--->", user)
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    if (room.users.some(userRoom => userRoom.sqlite_id === user.sqlite_id)) {
        return res.status(200).json({ message: "User already in room" })
    }
    room.users.push(user._id)
    await room.save()
    res.status(200).json(room)
}


async function getRoomMessages(req, res) {
    const { id } = req.params
    const { skip, limit } = req.body

 
    console.log(req.params)

    const unreadCount = await Message.countDocuments({
        room: id,
        readBy: { $ne: req.userId }
    });


    

        const messages = await Message.find({
            room: id,
           // readBy: { $ne: req.userId } // mensajes donde el usuario no aparece en readBy
        })
             // del más viejo al más reciente
            
           
            .populate('from_user');


        return res.status(200).json({
            messages: [...messages],
            unreadCount,

        })

   /*  else {


        const messages = await Message.find({
            room: id,
            // mensajes donde el usuario no aparece en readBy
        })
            .sort({ createdAt: -1 }) // del más viejo al más reciente
            .skip((skip - 1) * 6)
            .limit(6)
            .populate('from_user');


        return res.status(200).json({
            messages,
            unreadCount
        })

    } */


    //console.log(req.user)







}



async function markAsRead(req, res) {
    // const {id} = req.params
    const  {messageIds}  = req.body

    console.log(messageIds)

    try {

        await Message.updateMany(
            { _id: { $in: messageIds }, readBy: { $ne: req.userId } },
            { $addToSet: { readBy: req.userId } }
        );
 
        
        console.log("se marcaron como leidos")

        res.status(200).json({ success: true })

    } catch (error) {
        console.log(error)
    }



}


const mongoose = require('mongoose');

// MongoDB connection URI
const uri = "mongodb+srv://wamaimatu:wamai2024@cluster0.id4me.mongodb.net/myDatabase?retryWrites=true&w=majority";

mongoose.connect(uri)
    .then(() => console.log('Database connected successfully'))
    .catch((e) => console.error('Error connecting to database:', e));

// Define schema and model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Run example query
async function runQueryExample() {
    try {
        const newUser = await User.create({
            name: "update user",
            email: "update user",
            age: 40,
            isActive: true
        });

        await newUser.save()

        console.log('Created new user:', newUser);

        const allUser = await User.find({});
        
        
        const countDocuments = await User.countDocuments({isActive: true});
        console.log(countDocuments);

        const deletedUser = await User.findByIdAndDelete(newUser._id)
        console.log(deletedUser);
        const updateUser = await User.findByIdAndUpdate(newUser._id, {
            $set: { age: 100 }, $push: { tags: 'updated' }
        }, { new: true }
    );
    console.log("updated user", updateUser);

    } catch (e) {
        console.error('Error:', e);
    } finally {
        mongoose.disconnect();
    }
}

runQueryExample();




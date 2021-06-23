module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        name : {
            type: DataTypes.STRING,
        },
        facultyId:{
            type: DataTypes.STRING,
        },
        password : {
            type: DataTypes.STRING
        },
        department: {
            type: DataTypes.STRING
        },
        designation: {
            type: DataTypes.STRING
        },
        qualification: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.STRING
        },
        isDelete:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isCoordinator:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        isFaculty:{
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        loginCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    });

    return Users;
};
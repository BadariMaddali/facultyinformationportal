module.exports = (sequelize, DataTypes) => {

    const Journals = sequelize.define("Journals", {
        sNo: {
            type: DataTypes.STRING,
        },
        facultyName: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
        },
        year: {
            type: DataTypes.STRING,
        },
        journalsName: {
            type: DataTypes.STRING,
        },
        volNo: {
            type: DataTypes.STRING,
        },
        issueNo: {
            type: DataTypes.STRING,
        },
        issnNo: {
            type: DataTypes.STRING,
        },
        doi: {
            type: DataTypes.STRING,
        },
        indexing: {
            type: DataTypes.STRING,
        },
        pageNo: {
            type: DataTypes.STRING,
        },
        publishedBook: {
            type: DataTypes.STRING,
        },
        publisherName: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        department: {
            type: DataTypes.STRING,
        }
    });
    
    return Journals;
}
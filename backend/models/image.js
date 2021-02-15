module.export = function(sequelize, DataTypes){
    let Image = sequelize.define("Image", {
        image_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Image
}
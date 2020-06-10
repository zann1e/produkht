module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            domain: { type : String , unique : true, required : true, dropDups: true, lowercase: true, trim: true },
            whois: String,
            meta: Object,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Domain = mongoose.model("domain", schema);
    return Domain;
};
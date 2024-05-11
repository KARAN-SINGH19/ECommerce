class Features {

    search = async (query, querySet) => {
        this.query = query
        this.querySet = querySet
        const keyword = this.querySet

        if (!keyword) {
            console.log('Keyword not found');
            return null;
        }

        const output = await this.query.find({ name: { $regex: keyword, $options: "i" } }); // $options: "i"  will make the search process case insensitive
        return output;
    }

    filter = async (query, querySet) => {
        this.query = query
        this.querySet = querySet
        const category = this.querySet
        console.log(category)

        if (!category) {
            console.log('category not found');
            return null;
        }

        const output = await this.query.find({ category: { $regex: category } });
        console.log(output)
        return output;

    }

    pagination = (resultPerPage, query, querySet) => {
        this.query = query
        let currentPage = querySet
        if (!currentPage) {
            currentPage = 1
        }

        const skip = resultPerPage * (currentPage - 1)

        const products = this.query.limit(resultPerPage).skip(skip)
        return products
    }

}

module.exports = Features;
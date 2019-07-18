import tabModel from '../../models/tab/tab'

class Tab {
    constructor() {
        this.fetchData = this.fetchData.bind(this)
    }
    fetchData(req,res,next) {
        tabModel.find({},{_id: 0},(err,data) => {
            if(err) {
               return res.sendStatus(500).json({errors: err, message: 'Internal server error'})
            }else{
                res.send({
                    status: 0,
                    data: data
                })
            }
        })
    }
}

export default Tab;
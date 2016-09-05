import { expect } from "chai"
import { fromJS , Map , List} from "immutable"
import { v1 } from "uuid"

import coreReducer from "../../src/server/reducer"
import { addRoom, removeRoom} from "../../src/server/actionCreator"

describe("server端核心Reducer",() => {

	it("可以当作一个reducer",() => {
		let id = v1()
		let actions = [
			{type:"ADD_ROOM",room:{id,name:"1",owner:"eisneim"}},
			{type:"ADD_ROOM",room:{name:"2",owner:"terry"}},
			{type:"ADD_ROOM",room:{name:"3",owner:"eisneim"}},
			{type:"REMOVE_ROOM",payload:{id:id,user:"eisneim"}}
		]
		const finalState = actions.reduce( coreReducer , undefined)
		expect(finalState.get("rooms").size).to.equal(2)
		expect(finalState.getIn(["rooms",0,"owner"])).to.equal("terry")
	})

	it("使用actionCreator",() => {
		let id = v1()
		let actions = [
			addRoom({id,name:"1",owner:"eisneim"}),
			addRoom({name:"2",owner:"terry"}),
			addRoom({name:"3",owner:"eisneim"}),
			removeRoom({id:id,user:"eisneim"})
		]
		
		const finalState = actions.reduce( coreReducer , undefined)
		expect(finalState.get("rooms").size).to.equal(2)
		expect(finalState.getIn(["rooms",0,"owner"])).to.equal("terry")
	})

})
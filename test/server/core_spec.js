// 先写测试 再写代码 注重于功能  而不是函数运行方式 可以将测试写的更完善
import { expect } from "chai"
import { v1 } from "uuid"
import { fromJS , Map , List} from "immutable"

import {
	addRoom,
	removeRoom
} from "../../src/server/core.js"

describe("rooms",() => {
	it("能够添加房间: addRoom",() => {
		//设置第一个房间的json
		var firstRoom = {name:"first room",id:v1(),owner:"Epat"}
		//定义变量新的state = 添加房间方法的返回值
		const nextState = addRoom( undefined , firstRoom);
		const rooms = nextState.get("rooms")
		//判断rooms是否存在
		expect( rooms ).to.be.ok
		//比较json和添加的房间数据是否一致
		expect( rooms.get(0) ).to.equal(Map(firstRoom))
		//定义下下个state
		const nextNextState = addRoom(nextState,{name:"second room",owner:"terry"})
		expect(nextNextState.getIn(["rooms",1,"name"])).to.equal("second room")
	})
	const mockState = fromJS({
		rooms:[{name:"first room",id:v1(),owner:"Epat"}]
	})
	it("能被创建者删除",() => {
		const state = removeRoom( mockState , {
			id:mockState.getIn(["rooms",0,"id"]),
			user: "Epat"
		})
		expect( state.get("rooms").size ).to.equal(0)
	})

	it("不能被其他人删除",() => {
		const state = removeRoom( mockState , {
			id:mockState.getIn(["rooms",0,"id"]),
			user: "terry"
		})
		expect( state.get("rooms").size ).to.equal(1)
	})

})
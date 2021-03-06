import { v1 } from "uuid"
import { fromJS , Map , List} from "immutable"

export const INITIAL_STATE = fromJS({
	rooms:[]
})

export function addRoom(state = INITIAL_STATE,room){
	if( !room || !room.owner ) 
		return state
	return state.update("rooms",rooms => rooms.push(Map({
		id: room.id || v1(),
		name: room.name || "no name",
		owner: room.owner 
	})))
}

export function removeRoom(state,{id,user}){
	const rooms = state.get("rooms")
	var index = rooms.findIndex( r => r.get("id") === id)
	var newName = rooms.getIn([index,"owner"])
	if(index == -1 || rooms.getIn([index,"owner"]) !== user){
		return state
	}
	return state.update("rooms",rooms => rooms.splice(index,1))
}
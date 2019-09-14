import * as KudoUitl from '../../util/kudo_util'

export const RECEIVE_KUDO = "RECEIVE_KUDO"
export const RECEIVE_ALL_KUDOS = "RECEIVE_ALL_KUDOS"

const receiveKudo = (kudo) => ({
    type: RECEIVE_KUDO,
    kudo
})

const receiveAllKudos = (kudos) => ({
    type: RECEIVE_ALL_KUDOS,
    kudos
})

export const fetchKudo = (kudoId) => dispatch => 
    KudoUitl.fetchKudo(kudoId).then((kudo) => dispatch(receiveKudo(kudo)))

export const createKudo = (kudo) => dispatch =>
    KudoUitl.createKudo(kudo).then((kudo) => dispatch(receiveKudo(kudo))) 

export const fetchAllKudos = () => dispatch =>
    KudoUitl.fetchAllKudos().then((kudos) => dispatch(receiveAllKudos(kudos)))

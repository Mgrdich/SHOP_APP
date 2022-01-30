export enum USERS_STACK_SCREENS {
    USERS = 'USERS',
    EDIT_USER = 'EDIT_USER'
}

export type RootUsersStackParamList = {
    [USERS_STACK_SCREENS.USERS]: undefined,
    [USERS_STACK_SCREENS.EDIT_USER]: undefined
}


export type Action =
  { type: 'PUSH_NEW_ROUTE', route: string }
    | { type: 'POP_ROUTE' }
    | { type: 'POP_TO_ROUTE', route: string }
    | { type: 'REPLACE_ROUTE', route: string }
    | { type: 'REPLACE_OR_PUSH_ROUTE', route: string }
    | { type: 'OPEN_DRAWER'}
    | { type: 'CLOSE_DRAWER'}
    | { type: 'SET_USER'}
    | { type: 'USER_CREATE'}
    | { type: 'ANSWER_CHANGED'}
    | { type: 'GET_QUESTION'}
    | { type: 'CREATE_RECORD'}
    | { type: 'TEXT_INPUT_CHANGED'}
    | { type: 'ANSWER_CREATE'}
    | { type: 'SET_LIST', list: string}
    | { type: 'EMAIL_CHANGED', text: string}
    | { type: 'PASSWORD_CHANGED', text: string}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;

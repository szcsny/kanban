import React, { createContext, useContext, useReducer, ReactNode } from "react";

interface Subtask {
    id: string,
    name: string,
    done: boolean,
}

interface Task {
    id: string,
    name: string,
    done: boolean,
    subtasks: Subtask[]
}

interface Column {
    id: string,
    name: string,
    tasks: Task[]
}

interface Board {
    id: string,
    name: string,
    columns: Column[]
}

interface DataState {
    boards: Board[]
}

type DataAction =
    | {type: "ADD_BOARD"; payload: Board}
    | {type: "ADD_COLUMN"; payload: Column, boardID: string}
    | {type: "ADD_TASK"; payload: Task, boardID: string, columnID: string}
    | {type: "ADD_SUBTASK"; payload: Subtask, boardID: string, columnID: string, taskID: string}
    | {type: "REMOVE_BOARD"; boardID: string}
    | {type: "REMOVE_COLUMN"; boardID: string, columnID: string}
    | {type: "REMOVE_TASK"; boardID: string, columnID: string, taskID: string}
    | {type: "REMOVE_SUBTASK"; boardID: string, columnID: string, taskID: string, subtaskID: string}
    | {type: "SET_TASK_DONE"; boardID: string, columnID: string, taskID: string, done: boolean}
    | {type: "SET_SUBTASK_DONE"; boardID: string, columnID: string, taskID: string, subtaskID: string, done: boolean}

const initialState: DataState = {
    boards:
    [
        {
            id: "board-01",
            name: "project A",
            columns:
            [
                {
                    id: "column-01",
                    name: "TODO",
                    tasks:
                    [
                        {
                            id: "task-01",
                            name: "Check progress",
                            done: false,
                            subtasks:
                            [
                                {
                                    id: "subtask-01",
                                    name: "Check code",
                                    done: false
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}


// reducer function
function dataReducer(state: DataState, action: DataAction): DataState
{
    switch(action.type)
    {
        case "ADD_BOARD":
            return {...state, boards: [...state.boards, action.payload]};

        case "ADD_COLUMN":
            return {
                ...state,
                boards: state.boards.map(board => 
                    board.id === action.boardID
                        ? {...board, columns: [...board.columns, action.payload]}
                        : board
                )
            }

        case "ADD_TASK":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.map(column =>
                          column.id === action.columnID
                            ? { ...column, tasks: [...column.tasks, action.payload] }
                            : column
                        )
                      }
                    : board
                )
            };

        case "ADD_SUBTASK":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.map(column =>
                          column.id === action.columnID
                            ? {
                                ...column,
                                tasks: column.tasks.map(task => 
                                    task.id === action.taskID
                                    ? {...task, subtasks: [...task.subtasks, action.payload]}
                                    : task
                                )
                            }
                            : column
                        )
                      }
                    : board
                )
            };

        case "REMOVE_BOARD":
            return {
                ...state,
                boards: state.boards.filter(board => {
                    return board.id !== action.boardID;
                })
            };
            
            
        case "REMOVE_COLUMN":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.filter(column =>
                          column.id !== action.columnID
                        )
                      }
                    : board
                )
            };

        case "REMOVE_TASK":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.map(column =>
                          column.id === action.columnID
                            ? {
                                ...column,
                                tasks: column.tasks.filter(task => 
                                    task.id !== action.taskID
                                )
                            }
                            : column
                        )
                      }
                    : board
                )
            };

        case "REMOVE_SUBTASK":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.map(column =>
                          column.id === action.columnID
                            ? {
                                ...column,
                                tasks: column.tasks.map(task => 
                                    task.id === action.taskID
                                    ? {
                                        ...task,
                                        substasks: task.subtasks.filter(subtask => 
                                            subtask.id !== action.subtaskID
                                        )
                                    }
                                    : task
                                )
                            }
                            : column
                        )
                      }
                    : board
                )
            };

        case "SET_TASK_DONE":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.map(column =>
                          column.id === action.columnID
                            ? {
                                ...column,
                                tasks: column.tasks.map(task => 
                                    task.id === action.taskID
                                    ? {
                                        ...task,
                                        done: !task.done
                                    }
                                    : task
                                )
                            }
                            : column
                        )
                      }
                    : board
                )
            };

        case "SET_SUBTASK_DONE":
            return {
                ...state,
                boards: state.boards.map(board =>
                  board.id === action.boardID
                    ? {
                        ...board,
                        columns: board.columns.map(column =>
                          column.id === action.columnID
                            ? {
                                ...column,
                                tasks: column.tasks.map(task => 
                                    task.id === action.taskID
                                    ? {
                                        ...task,
                                        subtasks: task.subtasks.map(subtask => 
                                            subtask.id === action.subtaskID
                                            ? {...subtask, done: !subtask.done}
                                            : subtask
                                        )
                                    }
                                    : task
                                )
                            }
                            : column
                        )
                      }
                    : board
                )
            };
    }
}

interface DataContextType {
    state: DataState;
    dispatch: React.Dispatch<DataAction>
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// provider component
export function DataProvider({children} : {children: ReactNode})
{
    const [state, dispatch] = useReducer(dataReducer, initialState);

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}

// custom hook
export function useData()
{
    const context = useContext(DataContext);
    if(!context)
    {
        throw new Error("useData must be used within a BoardProvider");
    }

    return context;
}
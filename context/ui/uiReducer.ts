import { UiState } from './';

type uiAction = | { type: '[UI] - ToggleMenu' };


export const uiReducer = (state: UiState, action: uiAction): UiState => {

    switch (action.type) {

        case '[UI] - ToggleMenu':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }
        default:
            return state;
    }
}
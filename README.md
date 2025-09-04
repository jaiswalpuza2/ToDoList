/**
 * -------------------- ToDo Application Logic --------------------
 * 
 * This is a React-based ToDo list app that allows users to:
 * 
 * -Add new tasks with title, description, and priority (normal/important)
 * - Edit existing tasks
 * - Delete tasks
 * - Save tasks in localStorage so they remain even after page refresh
 * - Search for tasks by title using a search bar
 * - Get live suggestions while typing in the search bar
 * - Display a message if the search is empty or no match is found
 * - Highlight important tasks in red and normal ones in green
 * - Show filtered results based on search, with a return button to go back
 * - Show popup modals for adding/editing tasks and for search warnings
 * 
 * -------------------- Main Functionalities --------------------
 * 
 * useState:
 * - Manages tasks, form data, search query, filtered view, suggestions, etc.
 * 
 * useEffect:
 * - On first render: loads tasks from localStorage
 * - On every task update: saves tasks to localStorage and updates filtered view
 * 
 * Adding a Task:
 * - Opens a popup where user fills form
 * - Task is added to state and saved in localStorage
 * 
 * Editing a Task:
 * - Loads selected task data into form for editing
 * - Updates that task in the list after submit
 * 
 * Deleting a Task:
 * - Removes task from state and localStorage
 * - If no tasks remain, clears localStorage completely
 * 
 * Searching Tasks:
 * - Filters tasks whose titles start with the search query
 * - Displays suggestions while typing
 * - Clicking on suggestion or search icon shows matched task(s)
 * - If nothing is found, a popup warning is shown
 * 
 * Clearing Search:
 * - Clicking the back arrow clears the search and shows all tasks again
 * 
 * UI:
 * - Uses Tailwind CSS classes for styling
 * - Important tasks show red background, normal ones show green
 * - Responsive layout using grid and flexbox
 * 
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import TaskDetail from "./pages/TaskDetail";
import ComposeTask from "./pages/ComposeTask";
import ConfirmAction from "./pages/ConfirmAction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="*" element={<Main />} />
        <Route path="/task-detail" element={<TaskDetail />} />
        <Route path="/compose-task" element={<ComposeTask />} />
        <Route path="/confirm-action" element={<ConfirmAction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { Save } from "lucide-react";
import { useState } from "react";

export default function TaskForm({ onSubmit, initialValues = {}, loading }) {
  const [values, setValues] = useState({
    title: "",
    description: "",
    category: "coding",
    priority: "medium",
    deadline: "",
    ...initialValues
  });
  const update = (event) => setValues({ ...values, [event.target.name]: event.target.value });

  return (
    <form className="grid-form" onSubmit={(event) => { event.preventDefault(); onSubmit(values); }}>
      <label>Title<input name="title" required value={values.title} onChange={update} /></label>
      <label>Category<select name="category" value={values.category} onChange={update}><option>coding</option><option>aptitude</option><option>technical</option><option>hr</option><option>resume</option><option>project</option></select></label>
      <label>Priority<select name="priority" value={values.priority} onChange={update}><option>low</option><option>medium</option><option>high</option></select></label>
      <label>Deadline<input name="deadline" type="date" value={values.deadline} onChange={update} /></label>
      <label className="span-2">Description<textarea name="description" value={values.description} onChange={update} /></label>
      <button className="primary-button" disabled={loading}>
        <Save size={18} />
        Save task
      </button>
    </form>
  );
}

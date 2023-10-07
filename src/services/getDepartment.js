export function getDepartments() {
  let department = window.localStorage.getItem('department');
  let departments;
  if (department) {
    departments = JSON.parse(department);
  }

  return departments;
}

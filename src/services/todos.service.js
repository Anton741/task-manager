import httpServise from "./http.service"

const todosEndpoint = '/todos';
const todoServices = {
  fetch: async () => {
    const {data} = await httpServise.get(todosEndpoint, {
      params:{
        _page:1,
        _limit:10
      }
    });
    return data
  },
  add: async (task) => {
    console.log(task);
    const {data} = await httpServise.post(todosEndpoint, task);
    return data
  }
}

export default todoServices;
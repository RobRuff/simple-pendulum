import { Pendulum } from './pendulum';
import "./styles.css";

let isPaused = false;
const pendulums: Array<Pendulum> = [];

const setPendulumConfig = async (index: number) => {
  const pendulum = new Pendulum(
    Number((document.getElementById(`angular-offset-${index}`) as HTMLInputElement)?.value) ?? 0, 
    Number((document.getElementById(`mass-${index}`) as HTMLInputElement)?.value) ?? 0, 
    Number((document.getElementById(`string-length-${index}`) as HTMLInputElement)?.value) ?? 0
  );
  if (pendulums.length < index) {
    pendulums.push(pendulum);
  } else {
    pendulums[index-1] = pendulum;
  }
  
  const response = await fetch('http://localhost:3000/configPendulum', {
    method: 'POST',
    body: JSON.stringify({
        angularOffset: pendulum.angularOffset,
        mass: pendulum.mass,
        stringLength: pendulum.stringLength,
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  });
  return response;
};

const addNewPendulum = async () => {
  const index = pendulums.length + 1;
  if (index < 6) {
    document.getElementById(`pendulum-${index + 1}`)?.classList.remove('hidden');
  }
};

const wait = function (ms = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

const getAngle = async () => {
  const response = await fetch('http://localhost:3000/getPendulumCoordinates');
  const result = await response.json();
  pendulums[0].draw(result.angle);
};

const startSimulation = async () => {
  if (isPaused) {
    isPaused = false;
  } else {
    const pendulumSettings = document.getElementsByClassName('pendulum-config');
    let index = 1;
    for await (const setting of pendulumSettings) {
      if (!setting.classList.contains('hidden')) {
        await setPendulumConfig(index);
      }
      index++;
    } 
  }
  await getAngle();
  let executions = 0;
  while (executions < 100 && !isPaused) {
    executions++;
    await wait(50);
    await getAngle();
  }
};

const pauseSimulation = () => {
  isPaused = true;
};

window.addEventListener("load", () => {
  document.getElementById('new-pendulum')?.addEventListener("click", addNewPendulum);
  document.getElementById('start-simulation')?.addEventListener("click", startSimulation);
  document.getElementById('pause-simulation')?.addEventListener("click", pauseSimulation);
});
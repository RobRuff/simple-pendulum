import { Pendulum } from './pendulum';
import "./styles.css";

let isPaused = false;
const pendulums: Array<Pendulum> = [new Pendulum(1, 0, 0, 0)];

const setPendulumConfig = async (index: number) => {
  const angularOffset =  Number((document.getElementById(`angular-offset-${index}`) as HTMLInputElement)?.value) ?? 0;
  const mass =  Number((document.getElementById(`mass-${index}`) as HTMLInputElement)?.value) ?? 0;
  const stringLength =  Number((document.getElementById(`string-length-${index}`) as HTMLInputElement)?.value) ?? 0;
  pendulums[index - 1].angularOffset = angularOffset;
  pendulums[index - 1].mass = mass;
  pendulums[index - 1].stringLength = stringLength;

  const response = await fetch('http://localhost:3000/configPendulum', {
    method: 'POST',
    body: JSON.stringify({
        angularOffset,
        mass,
        stringLength,
    }),
    headers: {
        'Content-Type': 'application/json'
    }
  });
  return response;
};

const addNewPendulum = async () => {
  if (pendulums.length < 5) {
    const newIndex = pendulums.length + 1;
    const pendulum = new Pendulum(newIndex, 0, 0, 0);
    pendulums.push(pendulum);
    document.getElementById(`pendulum-${newIndex}`)?.classList.remove('hidden');
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
  pendulums[0].clearCanvas();
  pendulums.forEach((pendulum) => pendulum.draw(result.angle));
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
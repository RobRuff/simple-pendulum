import { Pendulum } from './pendulum';
import "./styles.css";

let isPaused = false;
const pendulums: Array<Pendulum> = [new Pendulum(1, 0, 0, 0)];
const pendulumsPorts: number[] = [3000, 3001, 3002, 3003, 3004];

const setPendulumConfig = async (index: number) => {
  const angularOffset =  Number((document.getElementById(`angular-offset-${index}`) as HTMLInputElement)?.value) ?? 0;
  const mass =  Number((document.getElementById(`mass-${index}`) as HTMLInputElement)?.value) ?? 0;
  const stringLength =  Number((document.getElementById(`string-length-${index}`) as HTMLInputElement)?.value) ?? 0;
  pendulums[index - 1].angularOffset = angularOffset;
  pendulums[index - 1].mass = mass;
  pendulums[index - 1].stringLength = stringLength;

  const response = await fetch(`http://localhost:${pendulumsPorts[index - 1]}/configPendulum`, {
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

const pendulumAngle = async (index: number) => {
  const response = await fetch(`http://localhost:${pendulumsPorts[index]}/getPendulumCoordinates`);
  const result = await response.json();
  return result.angle;
};

const updatePendulums = async () => {
  const updatedAngles = await Promise.all(pendulums.map(async (_pendulum, index) => ({index, angle: await pendulumAngle(index)})));
  pendulums[0].clearCanvas();
  for (let i = 0; i < updatedAngles.length; i++) {
    const current = updatedAngles[i];
    pendulums[current.index].draw(current.angle);
  }
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
  await updatePendulums();
  let executions = 0;
  while (executions < 1000 && !isPaused) {
    executions++;
    await wait(50);
    await updatePendulums();
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
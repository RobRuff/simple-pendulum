import { Pendulum } from './pendulum';
import "./styles.css";

const pendulums: Array<Pendulum> = [];
const addNewPendulum = async () => {
  const index = pendulums.length + 1;
  if (index < 6) {
    document.getElementById(`pendulum-${index}`)?.classList.remove('hidden');
  }
  const pendulum = new Pendulum(
    Number((document.getElementById(`angular-offset-${index}`) as HTMLInputElement)?.value) ?? 0, 
    Number((document.getElementById(`mass-${index}`) as HTMLInputElement)?.value) ?? 0, 
    Number((document.getElementById(`string-length-${index}`) as HTMLInputElement)?.value) ?? 0
  );

  pendulums.push(pendulum);
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
}

const startSimulation = async () => {
  await getAngle();
  let executions = 0;

    while (executions < 1000) {
      executions++;
      await wait(50);
      await getAngle();
    }
}

window.addEventListener("load", () => {
  document.getElementById('new-pendulum')?.addEventListener("click", addNewPendulum);
  document.getElementById('start-simulation')?.addEventListener("click", startSimulation);
});
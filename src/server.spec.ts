import { expect, it, test } from 'vitest';
import fastify, { FastifyInstance } from 'fastify';

class Medic {
  name;
  specialty;

  constructor(name: string, specialty: string) {
    this.name = name;
    this.specialty = specialty;
  }

  getSpecialty(): string {
    return this.specialty;
  }
}

test('Create a medic register', () => {
  const medic = new Medic('John Doe', 'Cardiologist');

  expect(medic).toBeInstanceOf(Medic);
});

it('It should be a Fastify Instance', () => {
  const app = fastify();
  const instance: FastifyInstance = app;

  expect(app).toBe(instance);
});

import {expect, expectTypeOf, it} from "vitest";
import prisma from "../lib/prisma";
import { Client } from "@prisma/client";
import test from "node:test";

it('should not be a date', function () {
	const formationDate = '2023-12-23'

	!expectTypeOf(new Date(formationDate)).toBeObject
});

it('should be a date', function () {
	const startActingDate = '2012-06-21'

	expectTypeOf(new Date(startActingDate)).toBeObject
});

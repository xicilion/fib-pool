import coroutine = require('coroutine');

interface FibPoolInfo {
    maxsize: number;
    count: number;
    // boolean-type number
    running: number;
    wait: number;
    timeout: number;
}

interface FibPoolOptionCreator {
    (name: string): FibPoolPayloadObject;
}
interface FibPoolOptionDestoryor {
    (): void;
}
type FibPoolRetryCountType = number
interface FibPoolOptionResult {
    create: FibPoolOptionCreator
    destroy: FibPoolOptionDestoryor
    maxsize: number
    timeout: number
    retry: FibPoolRetryCountType
}
interface FibPoolOptionGenerator {
    (): FibPoolOptionResult;
}
type FibPoolOptsArg = FibPoolOptionResult | FibPoolOptionCreator

type FibPoolPayloadObject = object
interface FibPoolUnit {
    o: FibPoolPayloadObject;
    name: string;
    time: Date;
}
type FibPoolInnerJobName = string;
interface FibPoolInnerJob {
    name: FibPoolInnerJobName;
    ev: coroutine.Event;
    o?:FibPoolPayloadObject;
    // Error
    e?: FibPoolInnerErr;
}
type FibPoolInnerErr = any

interface FibPoolSeed extends Function {
    connections?(): number;
    info?(): FibPoolInfo; 
    clear?(): void;
}
interface FibPoolObjectToExtract {
    close?: Function;
    destroy?: Function;
    dispose?: Function;
}

interface FibPool extends Function {
}

interface _FibPool {
    (opt: FibPoolOptsArg, maxsize: number, timeout: number): FibPool
}

declare module "fib-pool" {
    export = _FibPool
}
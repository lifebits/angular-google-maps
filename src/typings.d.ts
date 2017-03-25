/* SystemJS module definition */
import '@types/node';

declare var module: NodeModule;
declare var require: NodeRequire;

interface NodeModule {
   id: string;
}

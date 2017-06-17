import css from './css';
import excludes from './excludes';
import files from './files';
import javascript from './javascript';
import vue from './vue';
import markdown from './markdown';
import text from './text';

const rules = Array.prototype.concat.apply([],[
  css,
  excludes,
  files,
  javascript,
  vue,
  markdown,
  text,
]).filter(x=>!!x && typeof(x)==='object');

export default rules;

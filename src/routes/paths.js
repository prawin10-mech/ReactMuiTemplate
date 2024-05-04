// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

export const ROOTS_DASHBOARD = "/";

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  faq: path(ROOTS_DASHBOARD, "/faq"),
  post: path(ROOTS_DASHBOARD, "/post"),
  search: path(ROOTS_DASHBOARD, "/search"),
  home: path(ROOTS_DASHBOARD, "/home"),
}
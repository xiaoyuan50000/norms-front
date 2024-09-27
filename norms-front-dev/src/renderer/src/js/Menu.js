function actionTable(opt) {
  if (opt == 'hide') {
    $('.bark-table-div').hide()
    $('.show-img').show()
    $('.hide-img').hide()
  } else {
    $('.bark-table-div').show()
    $('.show-img').hide()
    $('.hide-img').show()
  }
}

export { actionTable };